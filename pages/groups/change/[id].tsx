//next
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
//redux
import { useActions } from "../../../redux/store";
//components
import { Container } from "../../../components/Container";
import { GroupForm } from "../../../components/GroupForm";
//material ui
import { Box } from "@mui/material";

const Change: NextPage = function Change ()  {
    const router = useRouter();
    const { id } = router.query;
    const { sendChangeGroupThunk } = useActions();

    return (
        <Container>
            <Box
                sx={{
                    padding: "24px"
                }}
            >
                <GroupForm changeGroup={{ id: id ? +id : 0, thunkFunction: sendChangeGroupThunk }} />
            </Box>
        </Container>
    )
}

export default Change

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}