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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createUserPricingPlan } from 'apiSdk/user-pricing-plans';
import { Error } from 'components/error';
import { userPricingPlanValidationSchema } from 'validationSchema/user-pricing-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { PricingPlanInterface } from 'interfaces/pricing-plan';
import { getUsers } from 'apiSdk/users';
import { getPricingPlans } from 'apiSdk/pricing-plans';
import { UserPricingPlanInterface } from 'interfaces/user-pricing-plan';

function UserPricingPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: UserPricingPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createUserPricingPlan(values);
      resetForm();
      router.push('/user-pricing-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<UserPricingPlanInterface>({
    initialValues: {
      user_id: (router.query.user_id as string) ?? null,
      pricing_plan_id: (router.query.pricing_plan_id as string) ?? null,
    },
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
            Create User Pricing Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'user_pricing_plan',
  operation: AccessOperationEnum.CREATE,
})(UserPricingPlanCreatePage);
