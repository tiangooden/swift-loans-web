const ForbiddenPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8f8f8',
            color: '#333'
        }}>
            <h1 style={{
                fontSize: '3em',
                color: '#dc3545',
                marginBottom: '20px'
            }}>403 - Forbidden</h1>
            <p style={{
                fontSize: '1.2em',
                marginBottom: '30px'
            }}>You do not have permission to access this page.</p>
            <p style={{
                fontSize: '1em',
                color: '#666'
            }}>Please contact your administrator if you believe this is an error.</p>
            <a href="/dashboard" style={{
                marginTop: '40px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '1.1em'
            }}>Go to Dashboard</a>
        </div>
    );
};

export default ForbiddenPage;