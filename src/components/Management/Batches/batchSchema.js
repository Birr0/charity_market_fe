import * as Yup from 'yup';

let locations = Yup.mixed().oneOf([]); //get locations and load into local storage. Limit on behalf of users ...

export const batchSchema = Yup.object().shape({
    batch_identifier: Yup.string().required(),
    nickname: Yup.string(),
    description: Yup.string(),
    location: Yup.mixed().oneOf(['Store #1', 'Store #2', 'Store #3']),
})