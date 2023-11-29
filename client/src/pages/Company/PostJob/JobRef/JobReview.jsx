
function JobReview({formId, formSubmit, flag}) {
    function handleSubmit(e) {
        e.preventDefault();
        formSubmit();
    }
    return (  
        <>
            <div>JobReview</div>   
            <form id={formId} onSubmit={handleSubmit}>

            </form>
        </>
    );
}

export default JobReview;