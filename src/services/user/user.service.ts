import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session } from "inspector";
import { Model } from "mongoose";
import { User, UserDocument } from "src/models/user.model";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }
}