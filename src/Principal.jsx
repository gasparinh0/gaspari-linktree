import './App.css';

  /* Import da foto de perfil */
import Profile from './img/profile.png';

  /* Imports do react-icons */
import { AiFillGithub, AiFillLinkedin, AiFillBook } from 'react-icons/ai';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsFillShareFill } from 'react-icons/bs';

  /* Imports do React */
import { useState, useEffect } from 'react';

  /* Imports do react-toastify */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  /* Imports do material UI */
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Quando o modo escuro é ativado/desativado, adicione/retire a classe CSS do body
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

  };

  const showToast = () => {
    toast.success('Link da página copiado com sucesso!', {
      position: 'top-left',
      autoClose: 3000, // Tempo em milissegundos que o toast ficará visível
    });
  }

  function shareButton() {
    // Cria um elemento de texto temporário
    var tempInput = document.createElement("input");
    tempInput.value = window.location.href;

    // Adiciona o elemento temporário à página
    document.body.appendChild(tempInput);

    // Seleciona o texto no elemento de texto temporário
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móveis

    // Copia o texto para a área de transferência
    document.execCommand("copy");

    // Remove o elemento temporário
    document.body.removeChild(tempInput);

    // Exibe uma mensagem de toast
    showToast();
  }

    /* Cria a ação do botão Compartilhar */
  const shareButtonAction = {
    icon: <BsFillShareFill />,
    name: 'Compartilhar',
  };

    /* Cria a ação do botão de trocar de tema */
  const toggleThemeAction = {
    icon: isDarkMode ? <FaSun /> : <FaMoon />,
    name: isDarkMode ? 'Modo Claro' : 'Modo Escuro',
  };

    /* Chama todos os botões para o speed dial */
  const actions = [
    shareButtonAction,
    toggleThemeAction,
  ];

  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);

    if (action.name === 'Compartilhar') {
      shareButton();
    } else if (action.name === 'Modo Claro' || action.name === 'Modo Escuro') {
      toggleTheme();
    }

    // Feche o Speed Dial após clicar em uma ação
    handleClose();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="flex flex-col justify-center items-center">
        <img src={Profile} alt="profile" className="rounded-full shadow-xl border border-white"></img>
        <h1 className="text-4xl text-white mt-1">Lucas Gaspari</h1>
        <p className='text-white font-light'>Desenvolvedor Web</p>

        <div className='w-80'>
          <a href='https://github.com/gasparinh0' target='_blank' rel='noopener noreferrer'>
            <div className="bg-white bg-opacity-50 border-2 border-white p-3 rounded-xl mt-8 flex transition-all justify-center transform hover:scale-105 cursor-pointer shadow-xl">
              <AiFillGithub size={27} />
              <h1 className='ml-2 text-lg'>Acesse meu Github</h1>
            </div>
          </a>

          <a href='https://www.linkedin.com/in/lucasgaspari2004/' target='_blank' rel='noopener noreferrer'>
            <div className="bg-white bg-opacity-50 border-2 border-white p-3 rounded-xl mt-4 flex transition-all justify-center transform hover:scale-105 cursor-pointer shadow-xl">
              <AiFillLinkedin size={27} />
              <h1 className='ml-1 text-lg'>Acesse meu LinkedIn</h1>
            </div>
          </a>

          <a href='https://www.linkedin.com/in/lucasgaspari2004/' target='_blank' rel='noopener noreferrer'>
            <div className="bg-white bg-opacity-50 border-2 border-white p-3 rounded-xl mt-4 flex transition-all justify-center transform hover:scale-105 cursor-pointer shadow-xl">
              <AiFillBook size={27} />
              <h1 className='ml-1 text-lg'>Acesse meu portfólio</h1>
            </div>
          </a>
        </div>

        <div className='content-none bg-white w-44 h-0.5 rounded-xl mt-5'></div>
        <p className='text-white font-light mt-2'>Desenvolvido por - Lucas Gaspari</p>

      </div>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleActionClick(action)}
              />
            ))}
          </SpeedDial>
    </div>
  );
}

export default App;
