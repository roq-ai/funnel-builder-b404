import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getUserPricingPlanById, updateUserPricingPlanById } from 'apiSdk/user-pricing-plans';
import { Error } from 'components/error';
import { userPricingPlanValidationSchema } from 'validationSchema/user-pricing-plans';
import { UserPricingPlanInterface } from 'interfaces/user-pricing-plan';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { PricingPlanInterface } from 'interfaces/pricing-plan';
import { getUsers } from 'apiSdk/users';
import { getPricingPlans } from 'apiSdk/pricing-plans';

function UserPricingPlanEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<UserPricingPlanInterface>(
    () => (id ? `/user-pricing-plans/${id}` : null),
    () => getUserPricingPlanById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: UserPricingPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateUserPricingPlanById(id, values);
      mutate(updated);
      resetForm();
      router.push('/user-pricing-plans');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<UserPricingPlanInterface>({
    initialValues: data,
    validationSchema: userPricingPlanValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit User Pricing Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<PricingPlanInterface>
              formik={formik}
              name={'pricing_plan_id'}
              label={'Select Pricing Plan'}
              placeholder={'Select Pricing Plan'}
              fetcher={getPricingPlans}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_pricing_plan',
  operation: AccessOperationEnum.UPDATE,
})(UserPricingPlanEditPage);
