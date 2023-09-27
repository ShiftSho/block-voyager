import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Paper, Button, Card, CardContent, Grid, Box } from '@material-ui/core';
import { Alchemy, Network, Utils } from 'alchemy-sdk'; 
import './Transaction.css';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  
  const alchemy = new Alchemy(settings);                                     

function Transaction() {
  const { transactionHash } = useParams();
  console.log("Transaction Hash from useParams:", transactionHash);
  const [transactionDetail, setTransactionDetail] = useState();

  useEffect(() => {
    async function fetchTransactionDetail() {
      try {
        const transaction = await alchemy.transact.getTransaction(transactionHash); // Use getTransaction method
        if(transaction && transaction.value && transaction.gasPrice) {
          transaction.formattedValue = Utils.formatEther(transaction.value);
          transaction.formattedGasPrice = Utils.formatEther(transaction.gasPrice._hex) // Format value to Ether
        }
        setTransactionDetail(transaction);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      }
    }
    fetchTransactionDetail();
  }, [transactionHash]);

  

    return (
        <Container>
            <Paper elevation={3} className="transaction-container">
                <Box mb={3}> {/* This adds a bottom margin to the title */}
                    <Typography variant="h5" className="transaction-title">Transaction Details</Typography>
                </Box>
                {transactionDetail && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Card className="transaction-card">
                        <CardContent className="transaction-detail even">
                        <Typography variant="body1">From: {transactionDetail.from}</Typography>
                        </CardContent>
                        <CardContent className="transaction-detail odd">
                        <Typography variant="body1">To: {transactionDetail.to}</Typography>
                        </CardContent>
                        <CardContent className="transaction-detail even">
                        <Typography variant="body1">Gas: {transactionDetail.formattedGasPrice} Ether</Typography>  
                        </CardContent>
                        <CardContent className="transaction-detail odd">
                        <Typography variant="body1">Value: {transactionDetail.formattedValue} Ether</Typography>
                        </CardContent>
                        <CardContent className="transaction-detail even">
                        <Typography variant="body1">Nonce: {transactionDetail.nonce}</Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                )}
                <Box mt={3}> 
                    <Button variant="contained" color="primary" component={Link} to="/transactions">
                    Back to Transactions
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Transaction;