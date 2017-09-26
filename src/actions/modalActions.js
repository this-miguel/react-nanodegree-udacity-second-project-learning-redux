export const SETUP_MODAL = 'SETUP_MODAL';
export const SHOW_MODAL  =  'SHOW_MODAL';
export const CLEAR_AND_CLOSE_MODAL = 'CLEAR_AND_CLOSE_MODAL';

export const setupModal =  function (entity, id){
  return {
    type: SETUP_MODAL,
    entity,
    id,
  }
};

export const clearAndCloseModal =  function (){
  return {
    type: CLEAR_AND_CLOSE_MODAL
  }
};

export const showModal =  function (key){
  return {
    type: SHOW_MODAL,
    key
  }
};
