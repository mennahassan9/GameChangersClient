export class RegistrationModel
{
    name: string;
    email: string;
    password: string;
    passConf: string;
    region: string;
    remote: Boolean;
    location: string
    otherLocation: string;
    func: string;
    role: string;
    age: string;
    participated: Boolean;
    genNextMember: Boolean;
    ideasOrder: Array<Number> = new Array<Number>();
    brief: string;
}