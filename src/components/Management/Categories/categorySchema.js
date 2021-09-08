import * as Yup from 'yup';

export const categorySchema = Yup.object().shape({
    category_identifier: Yup.string().required(),
    name: Yup.string(),
    description: Yup.string(),
    //location: Yup.mixed().oneOf(['Store #1', 'Store #2', 'Store #3']),
})