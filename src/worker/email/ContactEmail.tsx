// src/worker/emails/ContactEmail.tsx
import * as React from 'react'
import {
  Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, Link
} from '@react-email/components'

export interface ContactEmailProps {
  firstName: string
  lastName: string
  email: string
  service: string
  message?: string
  submittedAt: string
  siteName?: string
}

const wrap = (children: React.ReactNode) => (
  <Container
    style={{
      maxWidth: 600,
      margin: '0 auto',
      background: '#0B0B0C',
      color: '#E6E6EA',
      border: '1px solid #2D2E33',
      borderRadius: 16,
      padding: 24,
      fontFamily:
        'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    }}
  >
    {children}
  </Container>
)

export default function ContactEmail(props: ContactEmailProps) {
  const {
    firstName,
    lastName,
    email,
    service,
    message,
    submittedAt,
    siteName = 'ACME Studios'
  } = props

  return (
    <Html>
      <Head />
      <Preview>{`New ${siteName} inquiry from ${firstName} ${lastName}`}</Preview>
      <Body style={{ background: '#0B0B0C', padding: 24 }}>
        {wrap(
          <>
            <Heading
              as="h2"
              style={{
                margin: 0,
                fontSize: 22,
                letterSpacing: '.2px',
                lineHeight: '1.3',
              }}
            >
              New contact request
            </Heading>

            <Text style={{ marginTop: 8, color: '#A3A3AD' }}>
              Received at <strong>{new Date(submittedAt).toUTCString()}</strong>
            </Text>

            <Section style={{ marginTop: 16 }}>
              <Text style={{ margin: 0 }}>
                <strong>Name:</strong> {firstName} {lastName}
              </Text>
              <Text style={{ margin: 0 }}>
                <strong>Email:</strong>{' '}
                <Link
                  href={`mailto:${email}`}
                  style={{ color: '#F97316', textDecoration: 'none' }}
                >
                  {email}
                </Link>
              </Text>
              <Text style={{ margin: 0 }}>
                <strong>Service:</strong> {service}
              </Text>
              {message ? (
                <Text style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
                  <strong>Message</strong>
                  <br />
                  {message}
                </Text>
              ) : null}
            </Section>

            <Hr style={{ borderColor: '#2D2E33', margin: '16px 0' }} />

            <Text style={{ color: '#A3A3AD', fontSize: 13 }}>
              Sent from <strong>{siteName}</strong>. Reply directly to contact the requester.
            </Text>
            <Text style={{ color: '#6B6B75', fontSize: 12, marginTop: 8 }}>
              © {new Date().getFullYear()} {siteName}
            </Text>
          </>
        )}
      </Body>
    </Html>
  )
}
