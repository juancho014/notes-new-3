const notesCtrl={}
const Note= require('../models/Notes')


notesCtrl.renderNoteForm=(req,res)=>{
    res.render('notes/newNote');
}


notesCtrl.createNewNote=async(req,res)=>{
    const {title,description}=req.body;
    const newnote=new Note({title,description});
    await newnote.save();
    console.log(newnote);
    res.redirect('/notes')
}


notesCtrl.renderNotes= async(req,res)=>{
  const notes=await  Note.find().lean()
  res.render('notes/allNotes',{notes})
};

notesCtrl.renderEditForm=async(req,res)=>{
    const note= await  Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/editNote',{note})
};

notesCtrl.updateNote=async(req,res)=>{
    const{title,description}=req.body;
   await Note.findByIdAndUpdate(req.params.id,{title,description})
    
    res.redirect('/notes')
}

notesCtrl.deleteNote=async(req,res)=>{
   await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
}


module.exports=notesCtrl;