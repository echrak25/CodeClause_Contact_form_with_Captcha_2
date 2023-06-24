import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  InputRightElement,
} from '@chakra-ui/react';
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';

export default function Contact() {
  const { hasCopied, onCopy } = useClipboard('example@example.com');
  const [captchaValue, setCaptchaValue] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  function generateCaptcha() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const handleCaptchaChange = (event) => {
    setUserCaptcha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userCaptcha.toLowerCase() !== captchaValue.toLowerCase()) {
      setCaptchaError('Incorrect CAPTCHA code. Please try again.');
      return;
    }

    // Start submitting
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          message: event.target.message.value,
        }),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        // Reset form
        setUserCaptcha('');
        setCaptchaValue(generateCaptcha());
        setCaptchaError('');
      } else {
        console.error('Error submitting form:', response.statusText);
        // Handle error state
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error state
    }

    // Done submitting
    setIsSubmitting(false);
  };


  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      align="center"
      justify="center"
      css={{
        backgroundAttachment: 'fixed',
      }}
      id="contact"
    >
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
      >
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Get in Touch
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Stack
                align="center"
                justify="space-around"
                direction={{ base: 'row', md: 'column' }}
              >
                <Tooltip
                  label="Email"
                  aria-label="Email"
                  placement={{ base: 'top', md: 'right' }}
                  hasArrow
                >
                  <Link
                    href="mailto:echrak234@gmail.com"
                    variant="contactIcon"
                  >
                    <IconButton
                      aria-label="Email"
                      icon={<MdEmail />}
                      size="lg"
                      variant="contactIcon"
                    />
                  </Link>
                </Tooltip>

                <Tooltip
                  label="LinkedIn"
                  aria-label="LinkedIn"
                  placement={{ base: 'top', md: 'right' }}
                  hasArrow
                >
                  <Link
                    href="https://www.linkedin.com/in/echrak-chalgami/"
                    target="_blank"
                    variant="contactIcon"
                  >
                    <IconButton
                      aria-label="LinkedIn"
                      icon={<BsLinkedin />}
                      size="lg"
                      variant="contactIcon"
                    />
                  </Link>
                </Tooltip>

                <Tooltip
                  label="Twitter"
                  aria-label="Twitter"
                  placement={{ base: 'top', md: 'right' }}
                  hasArrow
                >
                  <Link
                    href="https://twitter.com/example"
                    target="_blank"
                    variant="contactIcon"
                  >
                    <IconButton
                      aria-label="Twitter"
                      icon={<BsTwitter />}
                      size="lg"
                      variant="contactIcon"
                    />
                  </Link>
                </Tooltip>

                <Tooltip
                  label="GitHub"
                  aria-label="GitHub"
                  placement={{ base: 'top', md: 'right' }}
                  hasArrow
                >
                  <Link
                    href="https://github.com/echrak25"
                    target="_blank"
                    variant="contactIcon"
                  >
                    <IconButton
                      aria-label="GitHub"
                      icon={<BsGithub />}
                      size="lg"
                      variant="contactIcon"
                    />
                  </Link>
                </Tooltip>
              </Stack>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl
                    isRequired
                    isInvalid={captchaError !== ''}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <BsPerson />
                      </InputLeftElement>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your Name"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={captchaError !== ''}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <MdOutlineEmail />
                      </InputLeftElement>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={captchaError !== ''}
                  >
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <BsPerson />
                      </InputLeftElement>
                      <Textarea
                        id="message"
                        placeholder="Your Message"
                        resize="vertical"
                        rows={6}
                      />
                    </InputGroup>
                  </FormControl>

                  {captchaError && (
                    <Text color="red.500">{captchaError}</Text>
                  )}

                  <Flex justifyContent="space-between" width="100%">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text>
                        Enter the CAPTCHA code: <strong>{captchaValue}</strong>
                      </Text>
                      <Link onClick={() => setCaptchaValue(generateCaptcha())}>
                        (Refresh)
                      </Link>
                    </Stack>

                    <FormControl
                      isRequired
                      isInvalid={captchaError !== ''}
                    >
                      <InputGroup>
                        <Input
                          type="text"
                          id="captcha"
                          placeholder="Enter CAPTCHA"
                          value={userCaptcha}
                          onChange={handleCaptchaChange}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => onCopy()}
                          >
                            {hasCopied ? 'Copied' : 'Copy'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{captchaError}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    colorScheme="teal"
                    size="lg"
                    isFullWidth
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
