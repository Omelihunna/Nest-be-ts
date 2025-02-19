import { Injectable } from "@nestjs/common";
import { Model, ClientSession, HydratedDocument, Schema } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DBService<T> {
    constructor(
        private readonly Model: Model<T>,
        private readonly fields: string[] = []
    ) {}

    async create(data: any, session: ClientSession | null = null): Promise<any> {
        return this.Model.create([{ ...data }], { session });
    }

    async save(data: any, session: ClientSession | null = null): Promise<any> {
        const model = new this.Model(data);
        return model.save({ session });
    }

    async saveMany(data: any[], session: ClientSession | null = null): Promise<any> {
        return this.Model.insertMany(data, { session });
    }

    async find(query: any = {}, sort = {}, limit = 300, session: ClientSession | null = null): Promise<HydratedDocument<T>[]> {
        return this.Model.find(query)
            .populate(this.fields)
            .session(session)
            .limit(limit)
            .sort(sort)
            .exec();
    }

    async findById(id: string | Schema.Types.ObjectId, session: ClientSession | null = null): Promise<HydratedDocument<T> | null> {
        return this.Model.findById(id).populate(this.fields).session(session).exec();
    }

    async findOne(query: any, session: ClientSession | null = null): Promise<HydratedDocument<T> | null> {
        return this.Model.findOne(query).session(session).exec();
    }

    async findOneAndUpdate(id: string, data: any, session: ClientSession | null = null): Promise<HydratedDocument<T> | null> {
        return this.Model.findByIdAndUpdate(id, data, { new: true }).session(session).exec();
    }

    async update(id: string, data: any, session: ClientSession | null = null): Promise<HydratedDocument<T> | null> {
        return this.Model.findByIdAndUpdate(id, data, { new: true }).session(session).exec();
    }

    async updateOne(query: any, data: any, session: ClientSession | null): Promise<any> {
        return this.Model.findOneAndUpdate(query, data, { new: true }).session(session).exec();
    }

    async updateMany(query: any, data: any, session: ClientSession | null): Promise<any> {
        return this.Model.updateMany(query, data).session(session).exec();
    }

    async deleteOne(query: any, session: ClientSession | null): Promise<any> {
        return this.Model.findOneAndDelete(query).session(session).exec();
    }

    async deleteMany(query: any, session: ClientSession | null): Promise<any> {
        return this.Model.deleteMany(query).session(session).exec();
    }
}
