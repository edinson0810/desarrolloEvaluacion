const URL = "https://jsonplaceholder.typicode.com/"

export const solicitud = async (endpoint) => {
    const respuesta = await fetch (`${URL} ${endpoint}`);
    return await respuesta.json();
}