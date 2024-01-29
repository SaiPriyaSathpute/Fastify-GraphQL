import mongoose, { Document, Model, model, Schema } from "mongoose";

interface IRegional{
    accountId: Number,
    firstName: String,
    lastName: String,
    accountType: String
}

// Creating a new Schema for the regional
const regionalSchema = new Schema<IRegional>({
    accountId: Number,
    firstName: String,
    lastName: String,
    accountType: String
});

interface RegionalDocument extends IRegional, Document {}

export const regional: Model<RegionalDocument> = mongoose.model<RegionalDocument>('regional', regionalSchema);

interface INational{
    acctId: Number,
    firstName: String,
    lastName: String,
    acctType: String
}

// Creating a new Schema for the national
const nationalSchema = new Schema<INational>({
    acctId: Number,
    firstName: String,
    lastName: String,
    acctType: String
});

// Exporting the Mongoose model
interface NationalDocument extends INational, Document {}

export const national: Model<NationalDocument> = mongoose.model<NationalDocument>('national', nationalSchema);