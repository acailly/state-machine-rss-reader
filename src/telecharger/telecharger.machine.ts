import { createMachine } from 'xstate'

import { Context, Event, Typestate } from '../machine.types'

const machine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcwBswGMAWBDATjPgHQBKAl5gK4AO5+uyAlgPYB2ABBHB7gEbs2YALZg2yWAGII7MMSZsAbiwDWc1BhwEiZSrXqNWnbrF4C2Q0eNgIFyzIfYBtAAwBdV28SgaLWE2Z2bxAAD0QAJhcANmIAdijwgBYARgAOF1TU5PDk5MSAGhAATwiATljiVNLq1MT43NjYgFYAXzbCthYTYI0sPEIwEgpqOgZA4x5+QRExCWDff3HgsIQXQpKEPMT2kF6tAZIAUU5MFip8U24OZHI0Sn6YK2R5vwCjZcRkgGZS4iav7LhSKJRKlKJfFwFYqIEFNYiRFwuL5RZJRWqlVHbFqFPYPQYvRbvJChRAAWkSqXWiCacMRdPSX3CGKZqTabSAA */
  createMachine<Context, Event, Typestate>({
    context: {},
    predictableActionArguments: true,
    initial: 'Récupération des abonnements',
    states: {
      'Récupération des abonnements': {
        entry: 'afficherPageTelechargement',
        invoke: {
          id: 'récupérerListeAbonnements',
          src: 'récupérerListeAbonnements',
          onDone: [
            {
              target: 'En cours de téléchargement',
              actions: 'contexteAbonnements',
            },
          ],
        },
      },
      'En cours de téléchargement': {
        entry: 'téléchargerNouveautés',
      },
    },
    id: 'telecharger',
  })

export default machine
