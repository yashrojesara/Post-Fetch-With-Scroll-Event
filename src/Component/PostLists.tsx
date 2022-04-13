import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GetPopsts } from './service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ProgressBar from './ProgressBar';
import { IPosts } from "./Models";
import usePageBottom from "./useIntersectionObserval";
//import useIntersectionObserver from './useIntersectionHooks';

const PostLists: React.FC = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [counter, setCounter] = useState(0);
    const [maxLimit, setMaxLimit] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const [msgBox, setMsgBox] = useState({
        msg: '',
        open: false
    });
    const isReachedBottom = usePageBottom();
    const [isProgress, setProgress] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (posts.length === 0) {
            FetchPostList()
        }
    }, []);

    useEffect(() => {
        if (isReachedBottom && isProgress == false && !isLastPage) {
            FetchPostList()
        }
    }, [isReachedBottom]);

    useEffect(() => {
        if (!isLastPage && isProgress == false) {
            const interval = setInterval(() => { FetchPostList() }, 3000);
            return (() => clearInterval(interval));
        }
    }, [posts]);

    const FetchPostList = async () => {
        setProgress(true);

        await (GetPopsts(counter)).then(res => res.json())
            .then((result) => {

                setCounter(counter => counter + 1);
                if (counter == 0) {
                    setMaxLimit(result.nbPages);
                    setPosts(result.hits);
                } else {
                    const data: IPosts[] = result.hits;
                    setPosts([...posts, ...data]);
                }
                if (result.nbPages === 0) {
                    alert("All data fatched");
                    setIsLastPage(true)
                }
                setProgress(false)
            },
                (error) => {
                    setMsgBox({
                        msg: "Error in getting data",
                        open: true
                    });
                    setProgress(false);
                }
            )
    }
    const handleClose = (event: any, reason: any) => {
        setMsgBox({
            msg: '',
            open: false
        })
    }
    const passData = (data: any) => {
        console.log(data)
        navigate(`/display`, { state: data })
    }
    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography variant="h5" color="inherit" component="div" align="center">
                        Post lists
                    </Typography>
                </Toolbar>
            </AppBar>

            <br></br><br></br>
            <TableContainer component={Paper} style={{ overflowX: 'auto' }} >
                {isProgress ? (
                    <ProgressBar />
                ) : ('')
                }
                <Table style={{ minWidth: 650 }} data-testid="table">
                    <TableHead>
                        <TableRow selected>
                            <TableCell data-testid="author">Author</TableCell>
                            <TableCell data-testid="title">Title</TableCell>
                            <TableCell data-testid="url">Url</TableCell>
                            <TableCell data-testid="cdate">Created date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((row, index) => (
                            <TableRow data-testid="row" hover key={index} onClick={() => { passData(row) }}>
                                <TableCell>
                                    {row.author}
                                </TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell style={{ width: '100px' }}>{row.url}</TableCell>
                                <TableCell>{row.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default PostLists;