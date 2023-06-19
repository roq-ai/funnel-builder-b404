import * as yup from 'yup';

export const blockValidationSchema = yup.object().shape({
  type: yup.string().required(),
  funnel_builder_id: yup.string().nullable(),
});
