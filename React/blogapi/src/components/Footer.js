import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // <-- Reverted back to the standard Grid import
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const FooterContainer = styled('footer')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(8),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        PeerQuest
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: [
      'Resource',
      'Resource name',
      'Another resource',
      'Final resource',
    ],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function Footer() {
  return (
    <FooterContainer maxWidth="md" component={Container}>
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          // THIS IS THE CORRECTED LINE FOR STANDARD MUI V5 GRID USAGE
          // No 'item' prop, and 'xs', 'sm' props are directly on the Grid component.
          <Grid key={footer.title} xs={6} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {footer.title}
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="#" variant="subtitle1" color="text.secondary" underline="hover">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
    </FooterContainer>
  );
}