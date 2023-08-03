import React , {useEffect} from 'react'
// styles
import styles from '../../../styles/StudentsList.module.sass'
// Next Props
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
// next router
import { useRouter } from "next/router";
import { useActions } from '../../../redux/store';
import { FoundUsers } from '../../../components/FoundUsers';

const StudentList: NextPage = function StudentList ()  {
    const router = useRouter();
    const { id } = router.query;
    const { sendFilterGroupsThunk } = useActions();

    useEffect(() => {
        sendFilterGroupsThunk({
            group : id
        } , router)
    })





  return (   <FoundUsers />
   
  )
}

export default StudentList

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
