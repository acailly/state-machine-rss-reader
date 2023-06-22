import { Heading, Stack, Container, Input, Button, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useCallback, useMemo } from 'react'

import { Feed } from '../../types'

import useStateMachine from './useStateMachine'

function validateName(value: string) {
  let error
  if (!value) {
    error = 'Un nom est requis'
  }
  return error
}

function validateUrl(value: string) {
  let error
  if (!value) {
    error = 'Une adresse est requise'
  }
  return error
}

interface FormValues {
  name: string
  url: string
}

const NewFeedRSS = () => {
  const [ state, send ] = useStateMachine()

  const canCreateFeed = !!state.value.transitions.get('Validation flux RSS')
  const isSubmitting = state.name === "Création d'un abonnement RSS"

  const initialValues: FormValues = useMemo(
    () => ({
      name: '',
      url: '',
    }),
    []
  )

  // reset form when viderFormulaireFlag changes
  // @ts-expect-error pourquoi ?
  const formKey = state.context.viderFormulaireFlag ?? 'form'

  const onSubmit = useCallback(
    (values: FormValues) => {
      const abonnement: Feed = {
        title: values.name,
        url: values.url,
        type: 'rss',
        key: `rss:${values.url}`,
      }
      send({ type: 'Validation flux RSS', abonnement })
    },
    [send]
  )

  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Heading>Nouveau flux RSS</Heading>
        <Formik key={formKey} initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Stack spacing={4}>
              <Field name="name" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl isRequired isInvalid={!!form.errors.name && !!form.touched.name}>
                    <FormLabel htmlFor="name">Nom du flux RSS</FormLabel>
                    <Input {...field} id="name" />
                    <FormErrorMessage>{form.errors.name?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="url" validate={validateUrl}>
                {({ field, form }: FieldProps) => (
                  <FormControl isInvalid={!!form.errors.url && !!form.touched.url}>
                    <FormLabel htmlFor="url">Adresse du flux RSS</FormLabel>
                    <Input {...field} id="url" />
                    <FormErrorMessage>{form.errors.url?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button colorScheme="blue" disabled={!canCreateFeed} isLoading={isSubmitting} type="submit">
                Ajouter ce flux RSS
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => send({ type: 'Retour à la liste des abonnements' })}
              >
                Revenir à la liste des abonnements
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Container>
  )
}

export default NewFeedRSS
