import styled from "styled-components";
import header from "../assets/wally_header.jpg";

const FutureBook = () => {
    return (
        <Future>
            <h2>{' — En el futuro —'}</h2>
            <img src={header} alt="wally-header" style={{maxWidth:'90%', objectFit:'cover', padding:'0 2rem'}}/>
        </Future>
    );
}

const Future = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    gap: 1rem;
`;

export default FutureBook;