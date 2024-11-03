import { Button, SxProps } from "@mui/material"
import { Link } from "react-router-dom"

interface LinkButtonProps {
    label: string
    to: string
    sx?: SxProps
}

const LinkButton = ({ label, to, sx = {} }: LinkButtonProps) => {

    return (
        <Button
            component={Link}
            variant="outlined"
            sx={{ background: theme => theme.palette.common.white, ...sx }}
            to={to}
        >
            {label}
        </Button>
    )
}
export default LinkButton