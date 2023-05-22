import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Heading,
  Stack,
  Container,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Badge,
  Text,
  Link,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useCallback, useMemo } from 'react'

import { useStateMachine } from '../MachineProvider'
import { Feed } from '../types'

function validateName(value: string) {
  let error
  if (!value) {
    error = 'Un nom est requis'
  }
  return error
}

function validateConsumerKey(value: string) {
  let error
  if (!value) {
    error = 'Une valeur est requise pour ce champ'
  }
  return error
}

function validateConsumerSecret(value: string) {
  let error
  if (!value) {
    error = 'Une valeur est requise pour ce champ'
  }
  return error
}

function validateAccessTokenKey(value: string) {
  let error
  if (!value) {
    error = 'Une valeur est requise pour ce champ'
  }
  return error
}

function validateAccessTokenSecret(value: string) {
  let error
  if (!value) {
    error = 'Une valeur est requise pour ce champ'
  }
  return error
}

interface FormValues {
  name: string
  consumerKey: string
  consumerSecret: string
  accessTokenKey: string
  accessTokenSecret: string
}

const NewFeedTwitter = () => {
  const { state, send } = useStateMachine('abonnements')

  const canCreateFeed = state.nextEvents.includes('Validation flux Twitter')
  const isSubmitting = state.matches("Création d'un abonnement Twitter")

  const initialValues: FormValues = useMemo(
    () => ({
      name: '',
      consumerKey: '',
      consumerSecret: '',
      accessTokenKey: '',
      accessTokenSecret: '',
    }),
    []
  )

  // reset form when viderFormulaireFlag changes
  const formKey = state.context.viderFormulaireFlag ?? 'form'

  const onSubmit = useCallback(
    (values: FormValues) => {
      const abonnement: Feed = {
        title: values.name,
        consumerKey: values.consumerKey,
        consumerSecret: values.consumerSecret,
        accessTokenKey: values.accessTokenKey,
        accessTokenSecret: values.accessTokenSecret,
        type: 'twitter',
        key: `twitter:${values.consumerKey}`,
      }
      send({ type: 'Validation flux Twitter', abonnement })
    },
    [send]
  )

  return (
    <Container maxW="container.md">
      <Stack spacing={6}>
        <Heading>Nouveau flux Twitter</Heading>
        <Formik key={formKey} initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Stack spacing={4}>
              <Field name="name" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl isRequired isInvalid={!!form.errors.name && !!form.touched.name}>
                    <FormLabel htmlFor="name">Nom du flux</FormLabel>
                    <Input {...field} id="name" />
                    <FormErrorMessage>{form.errors.name?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="consumerKey" validate={validateConsumerKey}>
                {({ field, form }: FieldProps) => (
                  <FormControl isRequired isInvalid={!!form.errors.consumerKey && !!form.touched.consumerKey}>
                    <FormLabel htmlFor="consumerKey">Consumer key</FormLabel>
                    <Input {...field} id="consumerKey" />
                    <FormErrorMessage>{form.errors.consumerKey?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="consumerSecret" validate={validateConsumerSecret}>
                {({ field, form }: FieldProps) => (
                  <FormControl isRequired isInvalid={!!form.errors.consumerSecret && !!form.touched.consumerSecret}>
                    <FormLabel htmlFor="consumerSecret">Consumer secret</FormLabel>
                    <Input {...field} id="consumerSecret" />
                    <FormErrorMessage>{form.errors.consumerSecret?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="accessTokenKey" validate={validateAccessTokenKey}>
                {({ field, form }: FieldProps) => (
                  <FormControl isRequired isInvalid={!!form.errors.accessTokenKey && !!form.touched.accessTokenKey}>
                    <FormLabel htmlFor="accessTokenKey">Access token key</FormLabel>
                    <Input {...field} id="accessTokenKey" />
                    <FormErrorMessage>{form.errors.accessTokenKey?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="accessTokenSecret" validate={validateAccessTokenSecret}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.errors.accessTokenSecret && !!form.touched.accessTokenSecret}
                  >
                    <FormLabel htmlFor="accessTokenSecret">Access token secret</FormLabel>
                    <Input {...field} id="accessTokenSecret" />
                    <FormErrorMessage>{form.errors.accessTokenSecret?.toString()}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <div>
                <Badge colorScheme="blue">💡 Astuce</Badge>
                <Text>
                  Pour récupérer tous ces identifiants, vous pouvez créer une nouvelle application sur{' '}
                  <Link color="blue.500" href="https://developer.twitter.com/en/portal/projects-and-apps" isExternal>
                    le portail développeur de Twitter <ExternalLinkIcon mx="2px" />
                  </Link>{' '}
                  en suivant la documentation associée
                </Text>
              </div>
              <Button colorScheme="blue" disabled={!canCreateFeed} isLoading={isSubmitting} type="submit">
                Ajouter ce flux Twitter
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

export default NewFeedTwitter
