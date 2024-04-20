//We define schema definition for the type of data we will set from the Survey form (onboarding form that asks user Details viz What brings you to dribble? )
import mongoose from "mongoose"

export const userDetailsSchema = new mongoose.Schema({
    heading: { type: String, default: "" },
    subheading: { type: String, default: "" },
    options: [{ label: { type: String, default: "" }, checked: { default: false, type: Boolean } }]
})
