//next
import { NextPage, GetStaticProps } from "next";
//components
import { Authorization } from "../components/Authorization";
import { Header } from "../components/Header";

const SignIn: NextPage = () => {
    return (
        <>
            <Header isAuth={true} />
            <Authorization />
        </>
    )
}

export default SignIn

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    }
}