import { Link } from 'react-router-dom';
import { Button, Banner } from '@gitanimals/ui-panda';
import { css } from '../../styled-system/css';
import { authUtils } from '../utils';
import { ROUTES } from '../router/constants';

function AboutPage() {
  const isAuthenticated = authUtils.isAuthenticated();

  return (
    <div
      className={css({
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      })}
    >
      <h1
        className={css({
          fontSize: '2xl',
          fontWeight: 'bold',
          marginBottom: '2rem',
        })}
      >
        About GitAnimals
      </h1>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'gray.300',
          borderRadius: 'md',
          backgroundColor: 'white',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          What is GitAnimals?
        </h2>
        <p className={css({ marginBottom: '1rem', lineHeight: '1.6' })}>
          GitAnimals is a gamified platform that allows developers to raise virtual pets through their GitHub activity. 
          The more you contribute to your repositories, the more your virtual animals grow and evolve!
        </p>
        <p className={css({ marginBottom: '1rem', lineHeight: '1.6' })}>
          This webview application provides a mobile-friendly interface to interact with your GitAnimals dashboard, 
          view your pets, and track your progress.
        </p>
      </div>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'blue.300',
          borderRadius: 'md',
          backgroundColor: 'blue.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          Features
        </h2>
        <ul className={css({ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' })}>
          <li>Virtual pet management through GitHub contributions</li>
          <li>Progress tracking and statistics</li>
          <li>Mobile-optimized webview interface</li>
          <li>Secure authentication with token management</li>
          <li>Real-time synchronization with your GitHub activity</li>
        </ul>
      </div>

      <div
        className={css({
          padding: '2rem',
          border: '1px solid',
          borderColor: 'green.300',
          borderRadius: 'md',
          backgroundColor: 'green.50',
        })}
      >
        <h2 className={css({ fontSize: 'xl', fontWeight: 'semibold', marginBottom: '1rem' })}>
          Get Started
        </h2>
        {isAuthenticated ? (
          <div>
            <p className={css({ marginBottom: '1rem' })}>
              You're already authenticated! Explore your dashboard and manage your virtual pets.
            </p>
            <div className={css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })}>
              <Link to={ROUTES.HOME}>
                <Button>Go to Dashboard</Button>
              </Link>
              <Link to={ROUTES.PROFILE}>
                <Button variant="secondary">View Profile</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className={css({ marginBottom: '1rem' })}>
              To start using GitAnimals, you'll need to authenticate with your GitHub account.
            </p>
            <Link to={ROUTES.AUTH}>
              <Button>Get Started</Button>
            </Link>
          </div>
        )}
      </div>

      <Banner 
        image="🐾" 
        label="Start your journey with GitAnimals today!" 
      />
    </div>
  );
}

export default AboutPage;