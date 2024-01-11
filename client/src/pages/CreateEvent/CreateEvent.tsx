import {FC, useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import ButtonStd from '../../components/ButtonStd/ButtonStd';

import './CreateEvent.css';

const fileToDataUri = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const CreateEvent: FC = () => {
	const [photo, setPhoto] = useState<any>();
	const [dataUri, setDataUri] = useState<any>();
	const imgRef = useRef(null);
	const navigate = useNavigate();
	
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
		defaultValues: {
			photo: '',
			title: '',
			description: '',
			city: '',
			date: '',
			time_start: '',
			time_end: '',
		}
	});

	function previewFile(data: any) {
		console.log(data.target.files[0])

		if (data.target.files && data.target.files[0]) {
			// const url = URL.createObjectURL(data.target.files[0]);
			setPhoto(URL.createObjectURL(data.target.files[0]));
			
			fileToDataUri(data.target.files[0])
			.then((dataUri: any) => {
				setDataUri(dataUri)
			})
		}
    }

	const createEvent = (data: any) => {
		data ={...data, photo: dataUri, organizer_id: Number(localStorage.getItem('id'))}
		postEvent(data);
	}

	const handleError = (errors: any) => {
		console.log(errors);
	};

	async function postEvent(data: any) {
		try {
			const res = await axios.post('/api/event', data);
			if(res.statusText == 'OK'){
				console.log(res);
				navigate("/main");
			}
		}
		catch(err) {
			console.log(err);
		}
	}

	return(<>
		<h2 className='create-event-title'>Создание события</h2>
		<form onSubmit={handleSubmit(createEvent, handleError)} className='create-event-form'>
			{ photo && <div className='create-event-img'>
				<img ref={imgRef} src={photo} className='block-event__img' />
            </div> }
			<div className='create-event-form-container'>
			<div style={{marginTop: '20px'}}>
				<ValidatedInput style={{margin: '5px'}}
					text="Фото" type="file"
					onChange={(e: any) => previewFile(e)} 
				/>
			</div>
			<ValidatedInput 
				text='Название мероприятия' type="text" 
				placeholder='Футбол'
				{...register("title", { required: true })} />
			<textarea rows={5} placeholder='Описание' className='textarea'
				{...register("description", { required: true })}>
			</textarea>
			<div className="label">
            	<div className="text">Город</div>
				<div className="select-block">
					<select className="select" {...register("city", { required: true })}>
						<option value="Eкатеринбург">Eкатеринбург</option>
						<option value="Москва">Москва</option>
						<option value="Санкт-Петербург">Санкт-Петербург</option>
					</select>
				</div>
			</div>
			<ValidatedInput text="Дата" type="date" 
				{...register("date", { required: true })} />
			<div className='create-event-time-inputs'>
				<ValidatedInput text="Время начала" type="time" 
					placeholder='Описание'
					{...register("time_start", { required: true })} />
				<ValidatedInput text="Время окончания" type="time" 
					placeholder='Описание'
					{...register("time_end", { required: true })} />
			</div>
			<ValidatedInput text="Контакты для связи" type="text" 
				placeholder='ivan@yandex.ru'/>
			<ButtonStd style={{height: '40px', marginTop: '30px'}} type='submit'>Создать</ButtonStd>
			</div>
		</form>
	</>)
}

export default CreateEvent;