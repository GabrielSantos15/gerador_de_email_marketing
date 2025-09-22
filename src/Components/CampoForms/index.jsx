import './campo-forms.estilos.css'

export default function CampoForms(props){
    return(
        <fieldset className='campo-forms'>{props.children}</fieldset>
    )
}