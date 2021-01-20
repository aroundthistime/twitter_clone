import { authService } from "../fbase"

export default () => {
    const onLogOutClick = () => {
        authService.signOut();
    }
    return (
        <>
            <button onClick={onLogOutClick}>LOG OUT</button>
        </>
    )
}