import { Container, Typography } from "@mui/material"
import Layout from "../components/Layout"

const Home = () => {
  return (
    <Layout>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" align="center">Welcome to GP Vote</Typography>
      </Container>
    </Layout>
  )
}
export default Home