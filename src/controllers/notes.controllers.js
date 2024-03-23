const notesCtrl={}
const Note= require('../models/Notes');
require('../server');


notesCtrl.renderNoteForm=(req,res)=>{
    res.render('notes/newNote');
}


notesCtrl.createNewNote=async(req,res)=>{
    const {title,description}=req.body;
    const newnote=new Note({title,description});
    await newnote.save();
    req.flash('success_msg','Successfully created')
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
   req.flash('success_msg','note Updated Successfully')

    res.redirect('/notes')
}

notesCtrl.deleteNote=async(req,res)=>{
   await Note.findByIdAndDelete(req.params.id)
   req.flash('success_msg','note Deleted Successfully')
    res.redirect('/notes')
}


module.exports=notesCtrl;