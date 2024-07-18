﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EFwepApi.Migrations
{
    /// <inheritdoc />
    public partial class updateddate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Employee",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Employee");
        }
    }
}