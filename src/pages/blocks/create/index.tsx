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
import { createBlock } from 'apiSdk/blocks';
import { Error } from 'components/error';
import { blockValidationSchema } from 'validationSchema/blocks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FunnelBuilderInterface } from 'interfaces/funnel-builder';
import { getFunnelBuilders } from 'apiSdk/funnel-builders';
import { BlockInterface } from 'interfaces/block';

function BlockCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BlockInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBlock(values);
      resetForm();
      router.push('/blocks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BlockInterface>({
    initialValues: {
      type: '',
      funnel_builder_id: (router.query.funnel_builder_id as string) ?? null,
    },
    validationSchema: blockValidationSchema,
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
            Create Block
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="type" mb="4" isInvalid={!!formik.errors?.type}>
            <FormLabel>Type</FormLabel>
            <Input type="text" name="type" value={formik.values?.type} onChange={formik.handleChange} />
            {formik.errors.type && <FormErrorMessage>{formik.errors?.type}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FunnelBuilderInterface>
            formik={formik}
            name={'funnel_builder_id'}
            label={'Select Funnel Builder'}
            placeholder={'Select Funnel Builder'}
            fetcher={getFunnelBuilders}
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
  entity: 'block',
  operation: AccessOperationEnum.CREATE,
})(BlockCreatePage);
