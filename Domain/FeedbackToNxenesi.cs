using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class FeedbackToNxenesi
    {
        [Key]
        public Guid FeedbackID { get; set; }
        public string ProfesoriID { get; set; }
        public Profesori Profesori { get; set; }
        public string NxenesiEmail { get; set; } 
        public string Subject { get; set; }
        public string Message { get; set; }


        public DateTime MessageSentDate { get; set; }= DateTime.Now;


    }
}