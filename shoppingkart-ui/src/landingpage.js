import React, { Component } from 'react';
import './home.css'
import { getAllCategories, getAllProducts, getAllProductsBySubCategory, getAllSubCategories, getCurrentUser } from './util/APIUtils';
import ProductHome from './product';
import { Col, Form, Row, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;


class Landing extends Component {
    
    resumeData;
    constructor(props) {
        super(props);
        this.state = {
           uuid:'',
           userid:'',
           templateType:'',
           currentUser: null,
           isAuthenticated: false,
           products:[],
           categories:[],
           category:{
                    key:0,
            label: "Please Select Any Category"},
           subCategories:[],
           subCategory:{key:0,
            label: "Please Select Any Sub Category"}
        };
        this.routeChange = this.routeChange.bind(this);
        this.loadProductList = this.loadProductList.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleCategoryIdChange = this.handleCategoryIdChange.bind(this);
        this.handleSubCategoryIdChange = this.handleSubCategoryIdChange.bind(this);
        
    }

      
  loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

    componentDidMount() {
        this.loadCurrentUser();
        this.loadProductList();
        this.loadCategoriesList();

    }

    
    loadProductList(id) {
        this.setState({
            products: []
        }); 
        let promise;
        if(id == null || id === undefined){
            promise = getAllProducts();

        }else{
            promise = getAllProductsBySubCategory(id);
        }
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            const products = this.state.products.slice();
            this.setState({
                products: products.concat(response),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    
    loadCategoriesList() {
        let promise;
        promise = getAllCategories();
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            const categories = this.state.categories.slice();
            this.setState({
                categories: categories.concat(response),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    
    loadSubCategoriesList(id) {
        let promise;
        promise = getAllSubCategories(id);
        if(!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise            
        .then(response => {
            console.log(response);
            const subCategories = this.state.subCategories.slice();
            this.setState({
                subCategories: subCategories.concat(response),
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });  
        
    }

    handleCategoryIdChange(input) {
        this.setState({
            category: input
        });
        this.setState({
            subCategories: []
        }); 
        this.loadSubCategoriesList(input.key)
    }

    handleSubCategoryIdChange(input) {
        console.log(input)
        this.setState({
            subCategory: input
        });
        console.log(input.label)
        this.loadProductList(input.key);
    }


    routeChange() {
        let path = 'select-type';
        this.props.history.push(path);
      }
    
      

    render() {
        
        const { categories } = this.state;
        const { subCategories } = this.state;


        let categoryList = categories.length > 0
        && categories.map((item, i) => {
        return (
            <Option key={i} value={item.id}>{item.name}</Option>
        )
      }, this);

        
        let subCategoryList = subCategories.length > 0
        && subCategories.map((item, i) => {
        return (
            <Option key={i} value={item.id}>{item.name}</Option>
        )
      }, this);

        return (
            <div className=" min-h-screen  bg-slate-300">
            <div className="container">
            <Row><Form> <Col span={10}><FormItem className='col-12'  label="Category"> <Select  name="categoryId" labelInValue
                                value={this.state.category} 
                                onChange = {this.handleCategoryIdChange}>
                                {categoryList}
                                </Select>
                                </FormItem>
                                </Col>
                                <Col span={2}></Col>
                                <Col span={10}>
                                <FormItem  label="SubCategory"> <Select  name="subCategoryId" labelInValue
                                value={this.state.subCategory} 
                                onChange = {this.handleSubCategoryIdChange}>
                                {subCategoryList}
                                </Select>
                                </FormItem>
                                </Col>
                                </Form>
                                </Row>
            <Row gutter={16}>
                {this.state.products.map((product) => (
                    <ProductHome isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} product={product}
                    />
                ))}
                {
                    !this.state.isLoading && this.state.products.length === 0 ? (
                        <div className="no-products-found">
                            <span>No Products Found.</span>
                        </div>    
                    ): null
                }  
                </Row>
            </div>
        </div>
        );
    }

    
}

export default Landing;