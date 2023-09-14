import { Button, Grid } from "@mui/material";
import React, { useState, useEffect, useCallback, useContext } from "react";
import AddProposal from "./AddProposal";
import { collection, getDocs } from "firebase/firestore";
import { auth, db, instancesRef } from "../../../config/firebase";
import { NotificationContext } from "../../NotificationSnackbar";
import {
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    ListItemButton,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import ProposalDetail from "./ProposalDetail";

const PropsalSettings = () => {
    const [addView, setAddView] = useState(false);
    const [Proposals, setProposals] = useState([]);
    const [selectedProposal, setSelectedProposal] = useState({
        id: "",
        name: "",
        scope: [],
        providedBy: [],
        fulfilledBy: [],
        timeLine: [],
        terms: [],
    });
    const currentUser = auth.currentUser;
    const showNotification = useContext(NotificationContext);

    const selectProposal = (selectedItem) => {
        setSelectedProposal(selectedItem);
    };

    const addProposalService = () => {
        setAddView(true);
    };

    const getProposals = async () => {
        try {
            let ProposalCollectionRef = collection(
                db,
                instancesRef + currentUser.uid + "/proposalTemplates"
            );
            const ProposalsSnap = await getDocs(ProposalCollectionRef);
            let docs = ProposalsSnap.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProposals(docs);
            console.log("here are the Proposals", docs);
        } catch (error) {
            showNotification("error", "Error fetching Proposals");
        }
    };

    useEffect(() => {
        getProposals();
    }, []);

    return (
        <Grid container>
            {addView ? (
                <AddProposal />
            ) : (
                <>
                    <Grid item sx={{ maxWidth: 420, overflow: "auto" }}>
                        <List
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                >
                                    Proposal Template
                                </ListSubheader>
                            }
                        >
                            {Proposals?.map((Proposal) => (
                                <div key={Proposal.id}>
                                    <ListItemButton>
                                        <ListItem
                                            onClick={() =>
                                                selectProposal(Proposal)
                                            }
                                        >
                                            <ListItemText
                                                primary={Proposal.name}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                    <Divider component="li" />
                                </div>
                            ))}
                        </List>
                    </Grid>
                    <Grid item>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            sx={{ height: "80vh" }}
                            flexItem
                        />
                    </Grid>
                    <Grid item ml={2} xs={9}>
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ width: "250px" }}
                                onClick={() => addProposalService()}
                            >
                                Create new Template
                            </Button>

                            {selectedProposal.id !== "" ? (
                                <ProposalDetail
                                    selectedProposal={selectedProposal}
                                />
                            ) : (
                                <Typography>No Template selected.</Typography>
                            )}
                        </Stack>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default PropsalSettings;
