import React, { useState, useEffect } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { Container, Typography, Paper, List, ListItem, ListItemText, Box, Card, CardContent, Grid, IconButton, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Alert } from '@material-ui/lab';
import './Transactions.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Transactions() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [blockTransactions, setBlockTransactions] = useState([]);
  const [isValidBlockNumber, setIsValidBlockNumber] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function getLatestBlockNumber() {
      const latestBlock = await alchemy.core.getBlockNumber();
      setBlockNumber(latestBlock);
      setLatestBlockNumber(latestBlock);
    }

    getLatestBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlockWithTransactions() {
      if (blockNumber != null) {
        const block = await alchemy.core.getBlockWithTransactions(blockNumber);
        if (block && Array.isArray(block.transactions)) {
          setBlockTransactions(block.transactions);
        } else {
          setBlockTransactions([]);
        }
      }
    }

    getBlockWithTransactions();
  }, [blockNumber]);

  async function fetchLatestBlockNumber() {
    const latestBlockNumber = await alchemy.core.getBlockNumber();
    setBlockNumber(latestBlockNumber);
  }

  const handleBlockNumberChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || parseInt(value, 10) < 0) {
      setIsValidBlockNumber(false);
    } else {
      setIsValidBlockNumber(true);
      setBlockNumber(parseInt(value, 10));
    }
  };

  const displayedTransactions = showAll ? blockTransactions : blockTransactions.slice(0, 5);

  return (
    <Container>
      <Paper elevation={3} className="home-container">
        <Box mb={3} display="flex" alignItems="center">
          <IconButton onClick={() => setBlockNumber(blockNumber - 1)} disabled={blockNumber <= 0}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" className="home-title">Block Transactions</Typography>
          <IconButton onClick={() => setBlockNumber(blockNumber + 1)} disabled={blockNumber >= latestBlockNumber}>
            <ArrowForwardIcon />
          </IconButton>
          <Button variant="contained" color="primary" onClick={() => setBlockNumber(0)} style={{ marginLeft: 'auto' }}>
            Genesis Block
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={fetchLatestBlockNumber}>
              Latest Block
            </Button>
          </Box>
        </Box>
        <Box mb={3} display="flex" alignItems="center"> 
          <Typography variant="body1" style={{ marginRight: '10px' }}>Block Number:</Typography> 
          <TextField
            value={blockNumber}
            onChange={handleBlockNumberChange}
            type="number"
            variant="outlined"
          />
        </Box>
        {!isValidBlockNumber && (
          <Alert severity="error">Invalid Block Number</Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <List>
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map(transaction => (
                  <ListItem key={transaction.hash} className="home-list-item">
                    <Link to={`/transaction/${transaction.hash}`} className="home-link">
                      <Card className="home-card">
                        <CardContent>
                          <ListItemText primary={`Transaction Hash: ${transaction.hash}`} />
                        </CardContent>
                      </Card>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1">No transactions in this block.</Typography>
              )}
            </List>
            {blockTransactions.length > 5 && (
              <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Transactions;