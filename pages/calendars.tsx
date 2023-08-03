//next
import { NextPage, GetStaticProps } from "next";
//components
import { Container } from "../components/Container";
import { CalendarTable } from "../components/CalendarTable";

const Calendars: NextPage = () => {
    return (
        <Container>
            <CalendarTable />
        </Container>
    )
}

export default Calendars

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    }
}