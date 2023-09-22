import { Button, Grid } from "@mui/material";
import React, { useState, useEffect, useCallback, useContext } from "react";
import AddProduct from "./AddProduct";
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
import ProductDetail from "./ProductDetail";

const ProductsServicesSettings = () => {
    const [addView, setAddView] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        name: "",
        totalPrice: "",
        subtasks: [{ name: "", price: "" }],
    });
    const currentUser = auth.currentUser;
    const showNotification = useContext(NotificationContext);

    const selectProduct = (selectedItem) => {
        setSelectedProduct(selectedItem);
    };

    const addProductService = () => {
        setAddView(true);
    };

    const getProducts = async () => {
        try {
            let productCollectionRef = collection(
                db,
                instancesRef + currentUser.uid + "/products&services"
            );
            const productsSnap = await getDocs(productCollectionRef);
            let docs = productsSnap.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProducts(docs);
            console.log("here are the products", docs);
        } catch (error) {
            showNotification("error", "Error fetching products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Grid container>
            {addView ? (
                <AddProduct />
            ) : (
                <>
                    <Grid item md={2} sx={{ overflow: "auto" }}>
                        <List
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                >
                                    Products & Services
                                </ListSubheader>
                            }
                        >
                            {products?.map((product) => (
                                <div key={product.id}>
                                    <ListItemButton>
                                        <ListItem
                                            onClick={() =>
                                                selectProduct(product)
                                            }
                                        >
                                            <ListItemText
                                                primary={product.name}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                    <Divider component="li" />
                                </div>
                            ))}
                        </List>
                    </Grid>
                    <Grid item md={0.1}>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            sx={{ height: "100%" }}
                            flexItem
                        />
                    </Grid>
                    <Grid item ml={2} md={9.5}>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ width: "200px", marginBottom: 2 }}
                            onClick={() => addProductService()}
                        >
                            Add Product/Service
                        </Button>

                        {selectedProduct.id !== "" ? (
                            <ProductDetail selectedProduct={selectedProduct} />
                        ) : (
                            <Typography>No product selected.</Typography>
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default ProductsServicesSettings;
