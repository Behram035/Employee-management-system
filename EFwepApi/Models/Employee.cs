using System.ComponentModel.DataAnnotations;

namespace EFwepApi.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? Department { get; set; }
        [Required]
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
