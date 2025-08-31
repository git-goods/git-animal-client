import { useState } from 'react'
import { Button, Banner, Dialog } from '@gitanimals/ui-panda'
import { css } from '../styled-system/css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={css({
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    })}>
      <h1 className={css({
        textAlign: 'center',
        fontSize: '2xl',
        fontWeight: 'bold',
        marginBottom: '2rem'
      })}>
        GitAnimals UI Components Test
      </h1>
      
      <div className={css({ 
        padding: '1.5rem',
        border: '1px solid',
        borderColor: 'gray.300',
        borderRadius: 'md',
        backgroundColor: 'white'
      })}>
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          Button Component
        </h2>
        <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
          <Button onClick={() => setCount(count + 1)}>
            Count: {count}
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="primary" size="s">
            Small Primary
          </Button>
        </div>
      </div>

      <Banner 
        image="🎉"
        label="Success! Panda CSS UI components are working!"
      />

      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Test Dialog</Dialog.Title>
          <Dialog.Description>
            This is a test dialog using the Panda CSS UI components from the monorepo packages.
          </Dialog.Description>
          <div className={css({ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' })}>
            <Button variant="secondary">Close</Button>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  )
}

export default App
