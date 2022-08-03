enum GenderEnum{
    male = 'Male',
    female = 'Female',
    others ='Others'
}
export default GenderEnum


export function  genderEnumToStrin(value:GenderEnum):string {
    switch (value) {
        case GenderEnum.male:
            return GenderEnum.male
            break;
        
        case GenderEnum.female:
            return GenderEnum.female
            break;
        
        case GenderEnum.others:
            return GenderEnum.others
            break;
    
        default:
            return GenderEnum.others
            break;
    }
}