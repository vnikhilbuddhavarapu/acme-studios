import * as React from 'react'
import {
  Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, Link
} from '@react-email/components'

export interface ThankYouEmailProps {
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
      padding: 32,
      fontFamily:
        'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    }}
  >
    {children}
  </Container>
)

export default function ThankYouEmail(props: ThankYouEmailProps) {
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
      <Preview>{`Thanks for reaching out to ${siteName}, ${firstName}!`}</Preview>
      <Body style={{ background: '#0B0B0C', padding: 24 }}>
        {wrap(
          <>
            <Heading
              as="h1"
              style={{
                margin: 0,
                fontSize: 28,
                letterSpacing: '-.5px',
                lineHeight: '1.2',
                background: 'linear-gradient(90deg, #fb923c, #f97316, #ffb347)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Thanks for reaching out!
            </Heading>

            <Text style={{ marginTop: 16, fontSize: 16, lineHeight: '1.6' }}>
              Hey <strong>{firstName}</strong>,
            </Text>

            <Text style={{ marginTop: 8, fontSize: 16, lineHeight: '1.6' }}>
              We received your inquiry and we'll get back to you within <strong>24-48 hours</strong>. 
              In the meantime, feel free to explore our work and services.
            </Text>

            <Section
              style={{
                marginTop: 24,
                background: '#16161A',
                border: '1px solid #2D2E33',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <Heading
                as="h3"
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: '#A3A3AD',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Your Submission
              </Heading>

              <Text style={{ marginTop: 12, marginBottom: 4 }}>
                <strong>Name:</strong> {firstName} {lastName}
              </Text>
              <Text style={{ marginTop: 4, marginBottom: 4 }}>
                <strong>Email:</strong> {email}
              </Text>
              <Text style={{ marginTop: 4, marginBottom: 4 }}>
                <strong>Service:</strong> {service}
              </Text>
              {message ? (
                <Text style={{ marginTop: 12, whiteSpace: 'pre-wrap', color: '#D1D1D6' }}>
                  <strong>Message:</strong>
                  <br />
                  {message}
                </Text>
              ) : null}
              <Text style={{ marginTop: 12, fontSize: 13, color: '#6B6B75' }}>
                Submitted on {new Date(submittedAt).toLocaleString('en-US', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </Text>
            </Section>

            <Section style={{ marginTop: 32, textAlign: 'center' }}>
              <Link
                href="https://acme-studios.org/projects"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: 'linear-gradient(90deg, #fb923c, #f97316)',
                  color: '#0B0B0C',
                  textDecoration: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                View Our Work
              </Link>
            </Section>

            <Hr style={{ borderColor: '#2D2E33', margin: '32px 0' }} />

            <Text style={{ color: '#A3A3AD', fontSize: 14, lineHeight: '1.6' }}>
              Questions? Just reply to this email and we'll be happy to help.
            </Text>

            <Text style={{ color: '#6B6B75', fontSize: 12, marginTop: 16 }}>
              © {new Date().getFullYear()} {siteName}. All rights reserved.
            </Text>
          </>
        )}
      </Body>
    </Html>
  )
}
