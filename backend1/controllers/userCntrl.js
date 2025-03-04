import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"

export const createUser = asyncHandler(async(req, res) => {
    console.log("Creating a User!!!");
    let { email } = req.body

    //  console.log(email);
    const userExists = await prisma.user.findUnique({ where: { email: email } })
    if (!userExists) {
        const user = await prisma.user.create({ data: req.body });
        res.send({
            message: "user registered successfully.",
            user: user,
        });
    } else res.status(201).send({ message: "User already registered!" })
})

// to  a bookvisits
export const bookVisit = asyncHandler(async(req, res) => {
    const { email, date } = req.body
    const { id } = req.params

    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        })
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({ message: "This residency already booked by you!!" })
        } else {
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: { push: { id, date } },
                },
            })
        }
        res.send("Your visit is booked successfully.")
    } catch (err) {
        throw new Error(err.message)
    }
})

// get all bookings
export const allBookings = asyncHandler(async(req, res) => {
        const { email } = req.body
        try {
            const bookings = await prisma.user.findUnique({
                where: { email },
                select: { bookedVisits: true }
            })
            res.status(200).send(bookings)
        } catch (err) {
            throw new Error(err.message)
        }
    })
    // cancel bookinf
export const cancelBooking = asyncHandler(async(req, res) => {
        const { email } = req.body
        const { id } = req.params

        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
                select: { bookedVisits: true },
            });
            const index = user.bookedVisits.findIndex((visit) => visit.id === id)
            if (index === -1) {
                res.status(404).json({ message: "Booking not found!" })
            } else {
                user.bookedVisits.splice(index, 1)
                await prisma.user.update({
                    where: { email },
                    data: {
                        bookedVisits: user.bookedVisits
                    },
                });
                res.send("Booking cancelled successfully!")
            }
        } catch (err) {
            throw new Error(err.message)
        }
    })
    // add to fav residency
export const toFav = asyncHandler(async(req, res) => {
    const { email } = req.body
    const { rid } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (user.favResidenciesID.includes(rid)) {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            })
            res.send({ message: "Removed from favourites", user: updatedUser })
        } else {
            const updatedUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        push: rid
                    }
                }
            })
            res.send({ message: "Updated favourites", user: updatedUser })
        }
    } catch (err) {
        throw new Error(err.message)
    }
})

// get all fav 
export const getAllFav = asyncHandler(async(req, res) => {
    const { email } = req.body
    try {
        const getAllFav = await prisma.user.findUnique({
            where: { email },
            select: { favResidenciesID: true }
        })
        res.status(200).send(getAllFav)
    } catch (err) {
        throw new Error(err.message)
    }

})