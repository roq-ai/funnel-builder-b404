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
import { getPricingPlanById, updatePricingPlanById } from 'apiSdk/pricing-plans';
import { Error } from 'components/error';
import { pricingPlanValidationSchema } from 'validationSchema/pricing-plans';
import { PricingPlanInterface } from 'interfaces/pricing-plan';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function PricingPlanEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PricingPlanInterface>(
    () => (id ? `/pricing-plans/${id}` : null),
    () => getPricingPlanById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PricingPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePricingPlanById(id, values);
      mutate(updated);
      resetForm();
      router.push('/pricing-plans');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PricingPlanInterface>({
    initialValues: data,
    validationSchema: pricingPlanValidationSchema,
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
            Edit Pricing Plan
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
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="funnels_limit" mb="4" isInvalid={!!formik.errors?.funnels_limit}>
              <FormLabel>Funnels Limit</FormLabel>
              <NumberInput
                name="funnels_limit"
                value={formik.values?.funnels_limit}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('funnels_limit', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.funnels_limit && <FormErrorMessage>{formik.errors?.funnels_limit}</FormErrorMessage>}
            </FormControl>
            <FormControl id="monthly_visitors_limit" mb="4" isInvalid={!!formik.errors?.monthly_visitors_limit}>
              <FormLabel>Monthly Visitors Limit</FormLabel>
              <NumberInput
                name="monthly_visitors_limit"
                value={formik.values?.monthly_visitors_limit}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('monthly_visitors_limit', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.monthly_visitors_limit && (
                <FormErrorMessage>{formik.errors?.monthly_visitors_limit}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="domains_limit" mb="4" isInvalid={!!formik.errors?.domains_limit}>
              <FormLabel>Domains Limit</FormLabel>
              <NumberInput
                name="domains_limit"
                value={formik.values?.domains_limit}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('domains_limit', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.domains_limit && <FormErrorMessage>{formik.errors?.domains_limit}</FormErrorMessage>}
            </FormControl>

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
  entity: 'pricing_plan',
  operation: AccessOperationEnum.UPDATE,
})(PricingPlanEditPage);
