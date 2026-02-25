namespace EmployeeManagmentAPI.Models
{
    public class RegisterReqUsers : IUser
    {
        public int Id { get; set; }
        public int IdCard { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public bool isAdmin { get; set; }

    }
}
