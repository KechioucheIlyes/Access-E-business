
import { useEffect, useState } from "react";
import styles from "./../../dashboard/dashboard.module.css"
import agg from "./../../../../Assets/agrandir.png"
import Image from "next/image";
import Avatar from '@mui/joy/Avatar';
import ModalModifyClient from "./../../../../Component/ModalModifyClient/ModalModifyClient"
import TableRowAllCommission from "./TableRowAllCommissions/TableRowAllCommissions"
import { Input } from "@mui/joy";

export default function BasicTable({ commission }) {
    const [modalOpen, setModalOpen] = useState(false);
    let [allUsers, setAllUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    let [openModal, setOpenModal] = useState(false);
    const itemsPerPage = 7;




    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleRows = allUsers.slice(startIndex, endIndex);
    const hasNextPage = endIndex < allUsers.length;
    const [searchQuery, setSearchQuery] = useState('');
    
    return (

        <div className={styles.usersTable}>
            <TableRowAllCommission />
        </div>


    );
}