import { solicitud } from "./module.js";

const cargar = async () => {
    const users = await solicitud("users");
    const respuesta = await Promise.all(
        users.map(async (user) => {
            const albumes = await solicitud(`albums?userId=${user.id}`);
            const foticos = await Promise.all(
                albumes.map(async (album) => {
                    const fotos = await solicitud(`photos?albumId=${album.id}`);
                    return { ...albumes, fotos}
                })
            )
            const tareas =await solicitud(`todos?Id=${user.id}`);
            const tareaCompletada = tareas.filter(tarea => tarea.completed)
            const tareaPendiente = tareas.filter(tarea => !tarea.completed)

            const posts = await solicitud(`posts?useerId=${user.id}`);
            const postsConComentarios = await Promise.all(
                posts.map(async(post) =>{
                    const comentarios = await solicitud(`comments?postId=${post.id}`);
                    return { ...post, comentarios}
                })
            );
            return { ...user, post: postsConComentarios, albumcitos: foticos, completada: tareaCompletada, pendiente: tareaPendiente}
        })
    );
    return respuesta;
}

cargar().then((a)=>{
    console.log(a);
    
});
