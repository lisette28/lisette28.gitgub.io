const error_404 = (required,response)=>{
    response.status(404).render("error")
};

export default {
    error_404
};